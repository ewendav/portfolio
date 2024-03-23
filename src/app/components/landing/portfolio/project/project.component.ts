import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{

  constructor(private route: ActivatedRoute) { }
  projectId! : string | null

  ngOnInit() {
    this.projectId = this.route.snapshot.fragment;
  }
}
