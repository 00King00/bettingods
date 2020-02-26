import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResponsiblePage } from './responsible.page';

describe('ResponsiblePage', () => {
  let component: ResponsiblePage;
  let fixture: ComponentFixture<ResponsiblePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiblePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResponsiblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
