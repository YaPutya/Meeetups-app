import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() formWasClosed = new EventEmitter();
  @Output() save = new EventEmitter<{
    name: FormControl<string | null>;
    date: FormControl<string | null>;
    time: FormControl<string | null>;
    duration: FormControl<string | null>;
    location: FormControl<string | null>;
    short_description: FormControl<string | null>;
    long_description: FormControl<string | null>;
    target_audience: FormControl<string | null>;
    need_to_know: FormControl<string | null>;
    will_happen: FormControl<string | null>;
    reason_to_come: FormControl<string | null>;
  }>();

  @Input() editFrom: any;

  myMeetupsReactiveForm!: FormGroup<{
    name: FormControl<string | null>;
    date: FormControl<Date | null>;
    time: FormControl<Date | null>;
    duration: FormControl<number | null>;
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
      name: [
        this.editFrom.name,
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      date: [
        this.editFrom.date,
        new Date(),
        [
          Validators.required,
          Validators.pattern(/^[0-9]*[.]*[0-9]*[.]?[0-9]+$/),
        ],
      ],
      time: [
        this.editFrom.time,
        new Date(),
        [Validators.required, Validators.pattern(/^[0-9]*[:]*[0-9]?[0-9]+$/)],
      ],
      duration: [
        this.editFrom.duration,
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      location: [
        this.editFrom.location,
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      short_description: [
        this.editFrom.short_description,
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      long_description: [
        this.editFrom.long_description,
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      target_audience: [
        this.editFrom.target_audience,
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      need_to_know: [
        this.editFrom.need_to_know,
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      will_happen: [
        this.editFrom.will_happen,
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      reason_to_come: [
        this.editFrom.reason_to_come,
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
    });
  }

  onSubmit() {
    this.adminService
      .createMeetup(this.myMeetupsReactiveForm.getRawValue() as any)
      .subscribe((meetup) => {
        this.cancelForm();
      });
  }

  // onDelete() {
  //   this.adminService
  //     .deleteMeetups(this.meetup?.id === ).subscribe((meetup) => {
  //       this.cancelForm();
  //     });
  // }    ДОДЕЛАТЬ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

  cancelForm() {
    this.formWasClosed.emit();
  }

  ngOnInit() {
    this.initForm();
    this.myMeetupsReactiveForm.valueChanges.subscribe((value) =>
      console.log(`${value.name}: ${value.date}`)
    );
  }
}
