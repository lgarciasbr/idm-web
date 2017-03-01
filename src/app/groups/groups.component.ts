import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from "@angular/common/src/facade/async";

import { GroupsService } from './groups.service';

import { Group } from './groups'

import any = jasmine.any;

@Component({
  selector: 'groups',
  templateUrl: 'groups.component.html'
})

export class GroupsComponent implements OnInit{
  title = 'Group';
  subTitle = 'Manage your groups.';
  isLoadingVisible = false;
  selectedRow = null;
  form: FormGroup;
  groupAddVisible = false;
  groupDetailVisible = true;
  groupDetail = new Group();
  groups: any[];
  myFocusTriggeringEventEmitter = new EventEmitter<boolean>();

  constructor(
    fb: FormBuilder,
    private _service: GroupsService,
    private _router: Router
  ){
    this.form = fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.getGroups()
    this.form.reset();
  }

  ShowAddGroup(){
    // If some row was selected.
    this.selectedRow = null;
    this.groupDetail = new Group();
    this.form.reset();

    this.groupDetailVisible = false;
    this.groupAddVisible = true;

    this.myFocusTriggeringEventEmitter.emit(true);
  }

  Save(){
    this.isLoadingVisible = true;

    this._service.addGroup(this.groupDetail)
      .subscribe(
        null,
        response => {
          if (response.status == 403) {
            this.isLoadingVisible = false;
            this._router.navigate(['auth', 'logout']);
          }
          else if (response.status == 500 || response.status == 400) {
            this.isLoadingVisible = false;
            alert(JSON.parse(response._body).message);
          }
        },
        () => {
          this.form.reset();
          this.groupAddVisible = false;
          this.groupDetailVisible = true;
          this.isLoadingVisible = false;
          this.getGroups();
        });
  }

  Cancel(){
    this.form.reset();
    this.groupAddVisible = false;
    this.groupDetailVisible = true;
  }

  getGroups(page?){
    this.isLoadingVisible = true;

    // If some row was selected.
    this.selectedRow = null;

    this._service.getGroups(page)
      .subscribe(
        data => this.groups = data.groups,
        response => {
          if (response.status == 403) {
            this.isLoadingVisible = false;
            this._router.navigate(['auth', 'logout']);
          }
          else if (response.status == 500 || response.status == 400) {
            this.isLoadingVisible = false;
            alert(JSON.parse(response._body).message);
          }
        },
        () => {
          this.isLoadingVisible = false;
          this.groupDetail = new Group();
        }
      );
  }

  getGroup(group){
    this.isLoadingVisible = true;

    this.groupAddVisible = false;
    this.groupDetailVisible = true;

    this.selectedRow = this.groups.indexOf(group);

    this._service.getGroup(group)
      .subscribe(
        data => this.groupDetail = data.group,
        response => {
          if (response.status == 404) {
            this.isLoadingVisible = false;
            alert("Group not found.");
          }
          else if (response.status == 403) {
            this.isLoadingVisible = false;
            this._router.navigate(['auth', 'logout']);
          }
          else {
            this.isLoadingVisible = false;
            alert(JSON.parse(response._body).message);
          }
        },
        () => {
          this.isLoadingVisible = false;
          window.location.hash ='DivDetails';
        }
      );
  }

  deleteGroup(groupDetail){
    if (groupDetail.name != null &&
      confirm("Are you sure you want to delete " + groupDetail.name + "?")) {
      this.isLoadingVisible = true;

      this._service.deleteGroup(groupDetail)
        .subscribe(null,
          response => {
            if (response.status == 404) {
              this.isLoadingVisible = false;
              alert("Could not delete the group.");
            }
            else if (response.status == 403) {
              this.isLoadingVisible = false;
              this._router.navigate(['auth', 'logout']);
            }
            else
            {
              this.isLoadingVisible = false;
              alert(JSON.parse(response._body).message);
            }
          },
          () => {
            this.isLoadingVisible = false;
            this.groupDetail = new Group();
            this.getGroups();
          }
        )
    }
  }

}
