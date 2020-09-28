import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Listing } from './types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const httpOptionsWithAuthToken = (token) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    AuthToken: token,
  }),
});

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor(private http: HttpClient, private auth: AngularFireAuth) {}

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listing');
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listing/${id}`);
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listing/${id}/add-view`,
      {},
      httpOptions
    );
  }

  getListingsForUser(): Observable<Listing[]> {
    return new Observable<Listing[]>((observer) => {
      this.auth.user.subscribe(
        (user) =>
          user &&
          user.getIdToken().then((token) => {
            if (user && token) {
              this.http
                .get<Listing[]>(
                  `api/users/${user.uid}/listing`,
                  httpOptionsWithAuthToken(token)
                )
                .subscribe((listings) => {
                  observer.next(listings);
                });
            } else {
              observer.next([]);
            }
          })
      );
    });
  }

  deleteListing(id: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            this.http
              .delete(`api/listing/${id}`, httpOptionsWithAuthToken(token))
              .subscribe(() => observer.next());
          });
      });
    });
  }

  createListing(
    name: string,
    description: string,
    price: number
  ): Observable<Listing> {
    return new Observable<Listing>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            this.http
              .post<Listing>(
                `/api/listing`,
                { name, description, price },
                httpOptionsWithAuthToken(token)
              )
              .subscribe(() => observer.next());
          });
      });
    });
  }

  editListing(
    id: string,
    name: string,
    description: string,
    price: number
  ): Observable<Listing> {
    return new Observable<Listing>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            return this.http
              .post<Listing>(
                `api/listing/${id}`,
                { name, description, price },
                httpOptionsWithAuthToken(token)
              )
              .subscribe(() => observer.next());
          });
      });
    });
  }
}
