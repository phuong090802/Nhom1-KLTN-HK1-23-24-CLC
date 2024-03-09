import Page from "./Page"

const Pagination = ({ page, pages, setPage }) => {
    return (page && !!pages) &&
        <div className="w-full flex justify-center items-center mt-4 gap-2 pb-1">
            {(page !== 1) &&
                <Page
                    page={'first'}
                    setPage={() => setPage(1)} />}

            {(page - 2 > 0) &&
                < Page
                    page={page - 2}
                    setPage={() => setPage(page - 2)} />}

            {(page - 1 > 0) &&
                <Page
                    page={page - 1}
                    setPage={() => setPage(page - 1)} />}

            {(pages != 0) &&
                <Page
                    page={page}
                    isSelected={true} />}

            {(page + 1 <= pages) &&
                <Page
                    page={page + 1}
                    setPage={() => setPage(page + 1)} />}

            {(page + 2 <= pages) &&
                <Page
                    page={page + 2}
                    setPage={() => setPage(page + 2)} />}

            {(page !== pages) &&
                <Page
                    page={'last'}
                    setPage={() => setPage(pages)} />}

        </div>
}

export default Pagination