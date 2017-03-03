import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Auth } from './auth.service';

class MockAuth { public authenticated() { return true }; }

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
			declarations: [AppComponent],
			providers: [ {provide: Auth,  useClass: MockAuth }],
			imports: [ RouterTestingModule ]
		});
  });
  it ('should work', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
