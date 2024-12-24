import { useState } from "react";
import ReactPaginate from "react-paginate";

// widgets
import { Notifications } from "./notifications";

// components
import { useNotificationHistory } from "@/core/use-cases/notifications/get-history";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button, buttonVariants } from "../components/button";

export const NotificationHistory = () => {
  const [page, setPage] = useState(0);

  const { notifications, totalPages, isLoadingNotificationHistory } =
    useNotificationHistory({
      page,
      pageSize: 15,
    });

  return (
    <>
      <Notifications
        isLoading={isLoadingNotificationHistory}
        notifications={notifications}
      />
      <div className="flex items-center space-x-6 lg:space-x-8 mt-6 justify-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          nextClassName="hidden"
          previousClassName="hidden"
          onPageChange={(page) => setPage(page.selected)}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          className="flex items-center justify-center gap-3"
          pageLinkClassName={buttonVariants({
            variant: "outline",
            className: "h-auto max-h-[10px] text-lg",
          })}
          activeLinkClassName={buttonVariants({
            variant: "default",
            className: "hover:text-white text-white",
          })}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
        />
        <div className="flex font-semibold w-[100px] items-center justify-center">
          {page + 1} / {totalPages}
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
            onClick={() => setPage(totalPages - 1)}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </>
  );
};
