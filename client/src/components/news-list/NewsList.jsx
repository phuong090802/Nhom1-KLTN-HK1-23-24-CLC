import NewsListItem from "./NewsListItem"

const NewsList = () => {
    return <div className="bg-white rounded-2xl px-6 pb-4 border shadow-md">
        <h1 className="pt-6 text-[18px] font-bold text-black/75">Tin tức</h1>
        <NewsListItem />
        <NewsListItem />
        <NewsListItem />
        <NewsListItem />
        <NewsListItem />
        <NewsListItem />
        <NewsListItem />
        <NewsListItem />
        <NewsListItem />
        <NewsListItem />
    </div>
}

export default NewsList