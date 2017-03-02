import { Component, OnInit, ApplicationRef } from '@angular/core';

import { Model } from '.././model';
import { ModelService } from '.././model.service';
import { ModelEntryFormComponent } from '../model-entry-form/model-entry-form.component';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
  providers: [ModelService]
})
export class ModelComponent implements OnInit {

  private model: Model;
  private showAddEntryForm: boolean = false;
	private totalWeight: number;

  constructor(
    private modelService: ModelService,
    private auth: Auth,
    private appRef: ApplicationRef) {}

  public ngOnInit() {
    if (this.auth.authenticated()) {
      this.loadModel();
    }
  }

	calcTotalWeight(): number {
		let total = 0;
		for (let entry of this.model.entries) {
				total += entry.portfolioWeight;
		}
		return total;
	}

  loadModel() {
    this.modelService.getModelForCurrentUser()
      .subscribe(
      model => {
				this.model = model;
				this.totalWeight = this.calcTotalWeight();
			},
      error => console.log(error));
  }

  createModel() {
    this.modelService.createModel()
      .subscribe(
      model => this.model = model,
      error => {
        console.log(error);
      });
  }

  saveEntry(modelEntry: any) {
    console.log('saving entry: ' + modelEntry);
    this.modelService.addModelEntry(this.model.id, modelEntry)
      .subscribe(
      model => this.model = model,
      error => console.log(error)
      );
  }

  openAddEntryForm() {
    this.showAddEntryForm = true;
  }
}
