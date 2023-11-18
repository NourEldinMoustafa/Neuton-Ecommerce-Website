import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  constructor(){
    // emailjs.init("0XpC30yg7gM4VDRSv");

    // const contactForm:any = document.getElementById('contact-form');
    // contactForm.addEventListener('submit', function (event:any) {
    //   event.preventDefault();
    //   // Send email to admin
    //   emailjs.sendForm('service_y83zs3n', 'template_admin', this)
    //     .then(function () {
    //       console.log('Email sent to admin');
    //     }, function (error:any) {
    //       console.error('An error occurred while sending email to admin:', error);
    //     });
  
    //   // Send email to user
    //   emailjs.sendForm('service_y83zs3n', 'template_user', this)
    //     .then(function () {
    //       alert('Email Sent!');
    //     }, function (error:any) {
    //       alert('An error occurred, please try again later.');
    //     });
    // });




  }

}
