import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetReadingsComponent } from './asset-readings.component';

describe('AssetReadingsComponent', () => {
  let component: AssetReadingsComponent;
  let fixture: ComponentFixture<AssetReadingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetReadingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
