import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioItemImgComponent } from './portfolio-item-img.component';

describe('ItemImgComponent', () => {
  let component: PortfolioItemImgComponent;
  let fixture: ComponentFixture<PortfolioItemImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioItemImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioItemImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
