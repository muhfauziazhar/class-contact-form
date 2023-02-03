import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'flowbite-react';
import {Link} from 'react-router-dom';

const NewsItem = ({img, desc, title, link}) => {
  return (
    <>
      <Link to={link}>
        <Card
          className="shadow-lg hover:shadow-purple-400"
          imgSrc={img}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {desc}
          </p>
        </Card>
      </Link>
    </>
  );
};

NewsItem.propTypes = {
  img: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default NewsItem;
