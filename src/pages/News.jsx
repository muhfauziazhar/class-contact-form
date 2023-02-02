import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
    fetchNews,
    fetchNewsSuccess,
    fetchNewsError,
} from "../store/actions/newsAction";
import NewsItem from "../components/NewsItem";
// import NewsItem from "../components/NewsItem";

class News extends Component {
    fetchData = async () => {
        const { dispatch } = this.props;
        dispatch(fetchNews());
        try {
            const response = await axios.get(
                "https://newsapi.org/v2/everything",
                {
                    params: {
                        q: "yogyakarta",
                        pageSize: "12",
                        apiKey: "bbd25ad1fa274f17b36230eede2891b8",
                    },
                }
            );
            dispatch(fetchNewsSuccess(response.data.articles));
        } catch (error) {
            dispatch(fetchNewsError(error));
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const { news } = this.props;
        return (
            <div className="flex flex-wrap m-4">
                {news.loading && <h1>Loading...</h1>}
                {news &&
                    news.data.map((newsItem, index) => (
                        <div
                            className="w-full md:w-1/2 lg:w-1/4 p-4"
                            key={index}
                        >
                            <NewsItem
                                link={newsItem.url}
                                img={newsItem.urlToImage}
                                desc={newsItem.description}
                                title={newsItem.title.replace(/ -.*/, "")}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                }}
                            ></NewsItem>
                        </div>
                    ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    news: state.news,
});

export default connect(mapStateToProps)(News);
