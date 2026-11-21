
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getAllAttendance } from "../../services/attendance.service";
import { ATTENDANCE_PAGE_SIZE } from "../../services/helper.service";

const AttendanceDashboard = () => {
  const [logs, setLogs] = useState({
    content: [],
    number: 0,
    totalPages: 0,
    totalElements: 0,
    first: true,
    last: true,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAttendance(0, ATTENDANCE_PAGE_SIZE, "date", "desc");
  }, []);

  // Get all attendance with pagination
  const getAttendance = async (
    pageNumber = 0,
    pageSize = ATTENDANCE_PAGE_SIZE,
    sortBy = "date",
    sortDir = "desc"
  ) => {
    try {
      setLoading(true);

      const data = await getAllAttendance(
        pageNumber,
        pageSize,
        sortBy,
        sortDir
      );

      console.log("All Attendance:", data);
      setLogs(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Error in getting attendance data");

      setLogs({
        content: [],
        number: 0,
        totalPages: 0,
        totalElements: 0,
        first: true,
        last: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "—";

    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-3 py-8 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">

          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
            Attendance Dashboard
          </h1>

          {logs.content.length === 0 ? (
            <p className="text-center text-gray-500 bg-white p-6 rounded-lg shadow-sm">
              No records found.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl bg-white shadow-sm border border-gray-200">

              <table className="w-full min-w-[600px] border-collapse text-center text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-3 py-4">Date</th>
                    <th className="px-3 py-4">Check In</th>
                    <th className="px-3 py-4">Check Out</th>
                    <th className="px-3 py-4">Name</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {logs.content.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4">
                        {log.date}
                      </td>

                      <td className="px-3 py-4 font-medium text-green-600">
                        {formatTime(log.checkInTime)}
                      </td>

                      <td className="px-3 py-4 font-medium text-blue-600">
                        {formatTime(log.checkOutTime)}
                      </td>

                      <td className="px-3 py-4 text-gray-700">
                        {log.userName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="mt-5 mb-3 flex flex-wrap justify-end gap-1 pr-6">

                {/* First */}
                <button
                  onClick={() =>
                    getAttendance(
                      0,
                      ATTENDANCE_PAGE_SIZE,
                      "date",
                      "desc"
                    )
                  }
                  disabled={logs.first}
                  className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  First
                </button>

                {/* Previous */}
                <button
                  onClick={() =>
                    getAttendance(
                      logs.number - 1,
                      ATTENDANCE_PAGE_SIZE,
                      "date",
                      "desc"
                    )
                  }
                  disabled={logs.first}
                  className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Prev
                </button>

                {/* Page Numbers */}
                {[...Array(logs.totalPages)].map((obj, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      getAttendance(
                        i,
                        ATTENDANCE_PAGE_SIZE,
                        "date",
                        "desc"
                      )
                    }
                    className={`rounded-md border px-3 py-2 text-sm transition ${
                      logs.number === i
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() =>
                    getAttendance(
                      logs.number + 1,
                      ATTENDANCE_PAGE_SIZE,
                      "date",
                      "desc"
                    )
                  }
                  disabled={logs.last}
                  className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>

                {/* Last */}
                <button
                  onClick={() =>
                    getAttendance(
                      logs.totalPages - 1,
                      ATTENDANCE_PAGE_SIZE,
                      "date",
                      "desc"
                    )
                  }
                  disabled={logs.last}
                  className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Last
                </button>

              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AttendanceDashboard;
