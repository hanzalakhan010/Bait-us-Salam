import { notifyError } from "../notifications";
import { host } from "../env";

interface Course {
  id: number;
  course_name: string;
}
export const loadCourses = async (
  params: Record<string, string> = {}
): Promise<Course[]> => {
  let urlParams = new URLSearchParams(params).toString();
  let response = await fetch(`${host}/api/v1/courses?${urlParams}`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    notifyError(data.error);
    return [];
  }
  let courses: Course[] = data.courses;
  return courses;
};
