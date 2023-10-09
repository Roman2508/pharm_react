import React from 'react'
import {
  GetHeaderScheduleQuery,
  FooterEntityResponse,
  HeaderEntityResponse,
  GetMainScreenQuery,
  SeoEntityResponse,
} from '../graphql/__generated__'
import { gql } from '../graphql/client'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import SubHeader from '../components/SubHeader/SubHeader'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import { Footer } from '../components/Footer/Footer'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import MainScreen from '../components/MainScreen/MainScreen'

export const Layout: React.FC<{ isHomePage?: boolean }> = ({ isHomePage = false }) => {
  // const [SEO, setSEO] = React.useState<SeoEntityResponse>()
  const [headerData, setHeaderData] = React.useState<HeaderEntityResponse>()
  const [footerData, setFooterData] = React.useState<FooterEntityResponse>()
  const [headerSchedule, setHeaderSchedule] = React.useState<GetHeaderScheduleQuery>()
  const [mainScreenData, setMainScreenData] = React.useState<GetMainScreenQuery>()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const layoutData = await gql.GetHomePageLayoutData()

        // @ts-ignore
        // setSEO(layoutData.seo)
        // @ts-ignore
        setHeaderData(layoutData.header)
        // @ts-ignore
        setFooterData(layoutData.footer)

        const mainScreenData = await gql.GetMainScreen()
        setMainScreenData(mainScreenData)

        const headerSchedule = await gql.GetHeaderSchedule()
        setHeaderSchedule(headerSchedule)
      } catch (err) {
        console.log(err, 'layout error')
        // window.location.replace('/404')
      }
    }

    fetchData()
  }, [])

  if (!headerData || !headerSchedule || !footerData || !mainScreenData) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Header headerData={headerData} headerSchedule={headerSchedule} />

      {isHomePage ? (
        <MainScreen mainScreenData={mainScreenData} />
      ) : (
        <>
          <SubHeader mainScreenData={mainScreenData} />
          <Breadcrumbs />
        </>
      )}

      <main>
        <Outlet />
      </main>
      <Footer footerData={footerData} />
    </>
  )
}
