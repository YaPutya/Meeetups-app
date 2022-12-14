import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Meetups } from '../../meetups';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-form-meetup',
  templateUrl: './form-meetup.component.html',
  styleUrls: ['./form-meetup.component.scss'],
})
export class FormMeetupComponent implements OnInit {
  @Input() meetup: Meetups | undefined;

  showForm: boolean = true;

  myMeetupsReactiveForm!: FormGroup<{
    name: FormControl<string | null>;
    date: FormControl<string | null>;
    time: FormControl<string | null>;
    location: FormControl<string | null>;
    short_description: FormControl<string | null>;
    long_description: FormControl<string | null>;
    target_audience: FormControl<string | null>;
    need_to_know: FormControl<string | null>;
    will_happen: FormControl<string | null>;
    reason_to_come: FormControl<string | null>;
  }>;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  initForm() {
    this.myMeetupsReactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/[А-я]/)]],
      date: ['', [Validators.required, Validators.pattern(/^[0-9]*[.]*[0-9]*[.]?[0-9]+$/)]],
      time: ['', [Validators.required, Validators.pattern(/^[0-9]*[:]*[0-9]?[0-9]+$/)]],
      location: ['', [Validators.required, Validators.pattern(/[А-я]/)]],
      short_description: ['', [Validators.required, Validators.pattern(/[А-я]/)]],
      long_description: ['', [Validators.required, Validators.pattern(/[А-я]/)]],
      target_audience: ['', [Validators.required, Validators.pattern(/[А-я]/)]],
      need_to_know: ['', [Validators.required, Validators.pattern(/[А-я]/)]],
      will_happen: ['', [Validators.required, Validators.pattern(/[А-я]/)]],
      reason_to_come: ['', [Validators.required, Validators.pattern(/[А-я]/)]],
    });
  }

  onSubmit() {
    if (this.myMeetupsReactiveForm.invalid) {
      return;
    }
    console.log(this.myMeetupsReactiveForm.value);
  }

  showHideForm() {
    this.showForm = !this.showForm;
  }

  cancelForm() {
    this.showForm = false;               //??????????????????????????
  }

  ngOnInit() {
    this.initForm();
    this.myMeetupsReactiveForm.valueChanges.subscribe((value) =>
      console.log(`${value.name}: ${value.date}`)
    );
  }
}
