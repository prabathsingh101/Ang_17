import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "../models/course";
import { CourseServiceService } from "./course-service.service";

export function courseResolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

  const coursesService = inject(CourseServiceService);

  return coursesService.findCourseById(route.params['id']);

}
