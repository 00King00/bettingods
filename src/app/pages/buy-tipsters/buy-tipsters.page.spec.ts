import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyTipstersPage } from './buy-tipsters.page';

describe('BuyTipstersPage', () => {
  let component: BuyTipstersPage;
  let fixture: ComponentFixture<BuyTipstersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyTipstersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyTipstersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
