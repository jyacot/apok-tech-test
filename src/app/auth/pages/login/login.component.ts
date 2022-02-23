import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      user: ['jyacot@grupoapok.com', [Validators.required, Validators.email]],
      password: ['my_next_work', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.form.valid) {
      this.router.navigate(['/nodes']);
    }
  }
}
