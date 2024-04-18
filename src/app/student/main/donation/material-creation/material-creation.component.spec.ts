import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCreationComponent } from './material-creation.component';

describe('MaterialCreationComponent', () => {
  let component: MaterialCreationComponent;
  let fixture: ComponentFixture<MaterialCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialCreationComponent]
    });
    fixture = TestBed.createComponent(MaterialCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
