import { notifyError } from "../notifications";

interface Application {
  id: number;
  submitted_by: string;
  course_name: string;
  created_at: Date;
  exam_status: Status;
  interview_status: Status;
  status: Status;
}

interface Status {
  at: Date;
  by: string;
  status: string;
}

export const loadApplications = async (
  params: Record<string, string>
): Promise<Application[]> => {
  let urlParams = new URLSearchParams(params);
  let response = await fetch(
    `http://localhost:5000/api/v1/applications?${urlParams}`,
    { credentials: "include" }
  );
  let data = await response.json();
  if (!response.ok) {
    notifyError(data.error);
    return [];
  }
  let applications: Application[] = data.applications;
  return applications;
};
