import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

export interface QueryConfig {
  path: string; //  path to collection
  field: string; // field to orderBy
  limit: number; // limit per query
  reverse: boolean; // reverse order?
  prepend: boolean; // prepend to source?
  searchValue: string;
}

@Injectable()
export class PaginationService {

  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: QueryConfig;

  // Observable data
  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();


  constructor(private db: AngularFirestore) {
  }

  // Initial query sets options and defines the Observable
  // passing opts will override the defaults
  init(path: string, field: string, opts?: any) {
    this.query = {
      path,
      field,
      limit: 10,
      reverse: false,
      prepend: false,
      searchValue: '',
      ...opts
    };
    const first = this.db.collection(this.query.path, ref => {
      return this.queryFn(ref);
    });
    this.mapAndUpdate(first, true);
    // Create the observable array for consumption in components
    this.data = this._data.asObservable().scan((acc, val) => {
      return this.query.prepend ? val.concat(acc) : acc.concat(val);
    });
  }

  // Retrieves additional data from firestore
  more() {
    const cursor = this.getCursor();
    const more = this.db.collection(this.query.path, ref => {
      return this.queryFn(ref).startAfter(cursor);
    });
    this.mapAndUpdate(more, false);
  }

  private queryFn(ref) {
    return ref
      .where(this.query.field, '>=', this.query.searchValue)
      .where(this.query.field, '<=', this.query.searchValue + '\uf8ff')
      .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
      .limit(this.query.limit);
  }

  // Determines the doc snapshot to paginate query
  private getCursor() {
    const current = this._data.value;
    if (current.length) {
      return this.query.prepend ? current[0].doc : current[current.length - 1].doc;
    }
    return null;
  }

  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>, init: boolean = false) {
    if (init) {
      this._done.next(false);
      this._loading.next(false);
      this._data = new BehaviorSubject([]);
    }
    if (this._done.value || this._loading.value) {
      return;
    }
    // loading
    this._loading.next(true);
    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges()
      .do(arr => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data();
          data.id = snap.payload.doc.id;
          const doc = snap.payload.doc;
          return {...data, doc};
        });

        // If prepending, reverse the batch order
        values = this.query.prepend ? values.reverse() : values;

        // update source with new values, done loading
        this._data.next(values);
        this._loading.next(false);

        // no more values, mark done
        if (!values.length) {
          this._done.next(true);
        }
      })
      .take(1)
      .subscribe();
  }


  get(key) {
    return this.db.collection(this.query.path).doc(key).snapshotChanges();
  }

  update(key, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection(this.query.path).doc(key).set(value);
  }

  delete(key) {
    return this.db.collection(this.query.path).doc(key).delete();
  }

  create(value) {
    return this.db.collection(this.query.path).add(value);
  }
}
