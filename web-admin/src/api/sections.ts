import { notifyError } from "../notifications";

interface Section {
  id: number;
  title: string;
}

export const loadSectionsByCourse = async (
  course_id: number,
  params: Record<string, string> = {}
): Promise<Section[]> => {
  let urlParams = new URLSearchParams(params).toString();
  let response = await fetch(
    `http://localhost:5000/api/v1/courses/${course_id}/sections?${urlParams}`,
    {
      credentials: "include",
    }
  );
  let data = await response.json();
  if (!response.ok) {
    notifyError(data.error);
    return [];
  }
  let sections: Section[] = data.sections;
  return sections;
};
