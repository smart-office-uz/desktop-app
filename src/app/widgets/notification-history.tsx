import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";

// services
import NotificationService from "@/core/services/notification.service";

// widgets
import { Notifications } from "./notifications";

// components
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button, buttonVariants } from "../components/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/select";

export const NotificationHistory = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const {
    data: notificationHistory,
    isFetching: isFetchingNotificationHistory,
    isLoading: isLoadingNotificationHistory,
  } = useQuery({
    queryKey: ["notification-history", page],
    queryFn: async () => {
      const notificationService = new NotificationService();
      const notifications = await notificationService.getAll(page);
      return notifications;
    },
  });

  return (
    <>
      <Notifications
        isLoading={
          isFetchingNotificationHistory || isLoadingNotificationHistory
        }
        notifications={notificationHistory?.notifications ?? []}
      />
      <div className="flex items-center space-x-6 lg:space-x-8 mt-6 justify-center">
        {/* <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          nextClassName="hidden"
          previousClassName="hidden"
          onPageChange={(page) => setPage(page.selected)}
          pageRangeDisplayed={5}
          pageCount={Math.floor(
            (notificationHistory?.totalNumberOfNotifications ?? 0) / pageSize,
          )}
          className="flex items-center justify-center gap-3"
          pageLinkClassName={buttonVariants({
            variant: "outline",
            className: "h-auto max-h-[10px] text-lg",
          })}
          activeLinkClassName={buttonVariants({ variant: "default" })}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
        />
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page + 1} of{" "}
          {Math.floor(
            (notificationHistory?.totalNumberOfNotifications ?? 0) / pageSize,
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPage(0)}
            disabled={page === 0}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="default"
            className="h-8 w-8 p-0"
            onClick={() => setPage((page) => page - 1)}
            disabled={page === 0}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="default"
            className="h-8 w-8 p-0"
            onClick={() => setPage((page) => page + 1)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="default"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              setPage(
                Math.floor(
                  (notificationHistory?.totalNumberOfNotifications ?? 0) /
                    pageSize,
                ) - 1,
              )
            }
            // disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </>
  );
};
