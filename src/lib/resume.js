import { personalInfo } from "./data";

export const resumeUrl = `${import.meta.env.BASE_URL}${personalInfo.resume.file}`;
export const resumeDownloadName = personalInfo.resume.fileName;
