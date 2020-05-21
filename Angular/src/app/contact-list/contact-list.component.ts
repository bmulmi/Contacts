import { Component, OnInit } from '@angular/core';
import ContactService from '../api/contact.service';
import Contact from '../models/Contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Array<Contact>;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getAll().subscribe((data) => {
      this.contacts = data;
    });
  }
}
