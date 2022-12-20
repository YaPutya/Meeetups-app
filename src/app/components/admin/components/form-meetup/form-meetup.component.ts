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
  @Input() isEdit: boolean = false;
  @Input() editForm: any;
  @Input() meetup: Meetups | undefined;

  @Output() formWasClosed = new EventEmitter();
  @Output() save = new EventEmitter<{
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
  }>();

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
        this.editForm?.name || '',
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      date: [
        this.editForm?.date || '',
        new Date(),
        [
          Validators.required,
          Validators.pattern(/^[0-9]*[.]*[0-9]*[.]?[0-9]+$/),
        ],
      ],
      time: [
        this.editForm?.time || new Date(),
        [Validators.required, Validators.pattern(/^[0-9]*[:]*[0-9]?[0-9]+$/)],
      ],
      duration: [
        this.editForm?.duration || '',
        // [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      location: [
        this.editForm?.location || '',
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      short_description: [
        this.editForm?.short_description || '',
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      long_description: [
        this.editForm?.long_description || '',
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      target_audience: [
        this.editForm?.target_audience || '',
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      need_to_know: [
        this.editForm?.need_to_know || '',
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      will_happen: [
        this.editForm?.will_happen || '',
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      reason_to_come: [
        this.editForm?.reason_to_come || '',
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
    });
  }

  cancelForm() {
    this.formWasClosed.emit();
  }

  onSubmit() {
    let requestFunc: any;
    if (this.isEdit) {
      requestFunc = this.adminService.editMeetups({
        ...(this.myMeetupsReactiveForm.getRawValue() as any),
        id: this.editForm?.id,
      });
    } else {
      const body: any = this.myMeetupsReactiveForm.getRawValue() as any;
      delete body.location;
      requestFunc = this.adminService.createMeetup(body);
    }

    requestFunc.subscribe(() => {
      this.cancelForm();
    });
  }

  onDelete() {
    this.adminService.deleteMeetups(this.editForm.id).subscribe((meetup) => {
      this.cancelForm();
    });
  }


  ngOnInit() {
    this.initForm();
    this.myMeetupsReactiveForm.valueChanges.subscribe((value) =>
      console.log(`${value.name}: ${value.date}`)
    );
  }
}
