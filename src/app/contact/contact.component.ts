import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  form: FormGroup = this.fb.group({
    name: "",
    email: "",
    subject: "",
    message: "",
    reply_to: "",
    user_email: "",


  });

  constructor(private fb: FormBuilder) { }
  async send() {
    emailjs.init("0XpC30yg7gM4VDRSv");
    let response = await emailjs.send("service_y83zs3n", "template_admin", {
      name: this.form.value.name,
      email: this.form.value.email,
      subject: this.form.value.subject,
      message: this.form.value.message,
    });
    alert('message has been sent!')
    this.form.reset();
  }
}


//     form:FormGroup= this.fb.group({});

// name: "",
// email: "admin",
// subject: "",
// message: "",
// reply_to: "",
// user_email: "",
// });
// constructor(private fb:FormBuilder){}

// emailjs.send("service_y83zs3n","template_user",{
//   name: "ahmed",
//   reply_to: "cap.nor2010@gmail.com",
//   email: "iosnoureldinmoustafa@gmail.com",
//   });















//     emailjs.init("0XpC30yg7gM4VDRSv");

//     const contactForm:any = document.getElementById('contact-form');
//     contactForm.addEventListener('submit', function (event:any) {
//       event.preventDefault();
//       // Send email to admin
//       emailjs.sendForm('service_y83zs3n', 'template_admin', this)
//         .then(function () {
//           console.log('Email sent to admin');
//         }, function (error:any) {
//           console.error('An error occurred while sending email to admin:', error);
//         });

//       // Send email to user
//       emailjs.sendForm('service_y83zs3n', 'template_user', this)
//         .then(function () {
//           alert('Email Sent!');
//         }, function (error:any) {
//           alert('An error occurred, please try again later.');
//         });
//     });





