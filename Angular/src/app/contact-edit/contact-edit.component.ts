import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import ContactService from '../api/contact.service';
import Contact from '../models/Contact';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit, OnDestroy {
  contact: Contact = new Contact();

  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.contactService.get(id).subscribe((contact: any) => {
          if (contact) {
            this.contact = contact;
          } else {
            console.log(`ERROR: Contact with id '${id}' not found!`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/contact-list']);
  }

  upsert(form: any) {
    this.contactService.upsert(form).subscribe(
      (res) => {
        this.gotoList();
      },
      (error) => console.error(error)
    );
  }

  remove(id: string) {
    this.contactService.remove(id).subscribe(
      (res) => this.gotoList(),
      (err) => console.log(err)
    );
  }
}
