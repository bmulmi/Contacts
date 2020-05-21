import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Contact from '../models/Contact';

@Injectable()
export default class ContactService {
  public API = 'http://localhost:5001/api';
  public CONTACTS_API = `${this.API}/contacts`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Contact>> {
    return this.http.get<Array<Contact>>(this.CONTACTS_API);
  }

  get(id: string) {
    return this.http.get(`${this.CONTACTS_API}/${id}`);
  }

  upsert(contact: Contact): Observable<Contact> {
    let res: Observable<Contact>;
    if (contact.id) {
      // update the contact
      res = this.http.put<Contact>(
        `${this.CONTACTS_API}/${contact.id}`,
        contact
      );
    } else {
      // create the contact
      res = this.http.post<Contact>(this.CONTACTS_API, contact);
    }
    return res;
  }

  remove(id: string) {
    return this.http.delete(`${this.CONTACTS_API}/${id.toString()}`);
  }
}
