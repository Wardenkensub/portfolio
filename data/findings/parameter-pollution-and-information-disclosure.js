const measurementApiInputValidation = {
  slug: "measurement-api-input-validation",
  title: "Input Validation Failures and Internal Error Disclosure in Measurement API",
  summary:
    "The measurement calculation endpoint failed to strictly validate malformed, duplicated, and unexpected input parameters, resulting in internal PHP error disclosure and calculation failures.",
  status: "Accepted",
  severity: "Medium",
  type: "API Security",
  tag: "Input Validation",
  program: "baliprov.dev",
  publicProgram: "Baliprov Bug Bounty",
  target: "Measurement Calculation API",
  reported: "Mar 10, 2026",
  listDate: "Mar 10, 2026",
  cvss: "5.3 (Medium)",
  category: "Improper Input Validation",
  sections: [
    {
      title: "Summary",
      icon: "summary",
      body:
        "Multiple input validation weaknesses were identified in the measurement calculation endpoint. Malformed date values, array-based parameter pollution, and unexpected parameters were not handled safely. As a result, crafted requests triggered verbose internal server errors and disrupted the expected calculation flow.",
    },
    {
      title: "Impact",
      icon: "shield",
      body:
        "These issues may allow an attacker to obtain internal implementation details, repeatedly trigger server-side exceptions, and interfere with the reliability of measurement calculations.",
      list: [
        "Disclosure of internal PHP error messages and backend processing logic",
        "Type confusion through scalar-to-array parameter manipulation",
        "Calculation failures caused by malformed or duplicated parameters",
        "Potential data integrity risk if invalid numeric values are processed downstream",
        "Unexpected parameters accepted without strict request-schema enforcement",
      ],
    },
    {
      title: "Finding 1: PHP Array Bounds Error",
      icon: "search",
      body:
        "The backend appeared to split the birthday parameter using a slash-delimited format without verifying that all required date components were present before accessing array indexes.",
      code: `POST https://api.example.com/api/v1/calc/measurement_test
Content-Type: application/x-www-form-urlencoded

birthday=15/06`,
      result:
        'The server returned an internal error disclosing PHP behavior, including: "Undefined array key 1".',
    },
    {
      title: "Finding 2: Parameter Pollution and Type Confusion",
      icon: "code",
      body:
        "The endpoint accepted conflicting scalar and array-style parameters. By supplying duplicate parameter forms, an attacker could cause the backend to process an array where a string or numeric value was expected.",
      code: `# Array-string confusion
POST https://api.example.com/api/v1/calc/measurement_test
Content-Type: application/x-www-form-urlencoded

berat=8&berat[]=999&birthday=2023-01-01

# Birthday array confusion
POST https://api.example.com/api/v1/calc/measurement_test
Content-Type: application/x-www-form-urlencoded

birthday[]=2023-01-01&birthday[]=invalid`,
      result:
        'The server returned verbose internal errors such as: "explode(): Argument #2 must be string, array given" and "Attempt to read property \'median\' on null".',
    },
    {
      title: "Finding 3: Unexpected Parameter Acceptance",
      icon: "code",
      body:
        "The endpoint did not reject additional parameters outside the apparent public request schema. While this alone does not prove privilege escalation or server-side mass assignment, it indicates that strict payload whitelisting was not enforced.",
      code: `POST https://api.example.com/api/v1/calc/measurement_test
Content-Type: application/json

{
  "berat": "50",
  "tinggi": 170,
  "birthday": "2025-09-30",
  "gender": "P",
  "admin": true,
  "debug": 1,
  "test": 1,
  "show_all": true,
  "bypass": true
}`,
      result:
        "The server returned HTTP 200 OK instead of rejecting unknown or unsupported request parameters.",
    },
    {
      title: "Additional Data Integrity Concern",
      icon: "shield",
      body:
        "The endpoint also appeared to accept abnormal numeric input formats, including extremely large scientific notation values and negative measurements. If these values are stored or used in statistical processing, they may affect the reliability of calculated results.",
      list: [
        "Extremely large values such as 1e308 should be rejected",
        "Negative height or weight values should be rejected",
        "All measurement fields should be constrained to realistic ranges",
      ],
    },


  ],
  timeline: [
    ["Discovered", "Mar 10, 2026"],
    ["Validated", "Mar 15, 2026"],
    ["Reported", "Mar 25, 2026"],
    ["Redacted", "Mar 25, 2026"],
  ],
};

export default measurementApiInputValidation;