import React from 'react'
import { Link } from 'react-router-dom'

import { Accordion } from '../ui/Accordion/Accordion'
import { GetAllNewsDatesQuery } from '../../graphql/__generated__'
import groupNewsByYearsAndMonths from '../../utils/groupNewsByYearsAndMonths'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

interface INewsArchiveProps {
  newsDates: GetAllNewsDatesQuery
}

const NewsArchive: React.FC<INewsArchiveProps> = ({ newsDates }) => {
  const newsYears = groupNewsByYearsAndMonths(newsDates)

  return (
    <>
      {newsYears ? (
        newsYears.map((yearData) => (
          <Accordion title={yearData.year} defaultOpen={false} key={yearData.year}>
            <ul>
              {yearData.months.map((monthData) => {
                return (
                  <li key={monthData.monthNum}>
                    <Link
                      to={`/novina/${yearData.year}/${monthData.monthNum}`}
                    >{`${monthData.monthName} (${monthData.count})`}</Link>
                  </li>
                )
              })}
            </ul>
          </Accordion>
        ))
      ) : (
        <LoadingSpinner />
      )}
    </>
  )
}

export default NewsArchive
