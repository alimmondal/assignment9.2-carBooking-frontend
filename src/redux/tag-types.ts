export enum tagTypes {
  user = "user",
  department = "department",
  faculty = "faculty",
  admin = "admin",
  student = "student",
  academicFaculty = "academic-faculty",
  academicDepartment = "academic-department",
  academicSemester = "academic-semester",
  building = "building",
  room = "room",
  car = "car",
  reservation = "reservation",
  offeredCourse = "offered-course",
  offeredCourseSection = "offered-course-section",
  offeredCourseSchedule = "offered-course-schedule",
  courseRegistration = "course-registration",
}

export const tagTypesList = [
  tagTypes.user,
  tagTypes.admin,
  tagTypes.car,
  tagTypes.reservation,

  tagTypes.department,
  tagTypes.faculty,

  tagTypes.student,
  tagTypes.academicFaculty,
  tagTypes.academicDepartment,
  tagTypes.academicSemester,
  tagTypes.building,
  tagTypes.room,

  tagTypes.offeredCourse,
  tagTypes.offeredCourseSection,
  tagTypes.offeredCourseSchedule,
  tagTypes.courseRegistration,
];
