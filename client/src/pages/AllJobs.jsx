import { Outlet, useLoaderData, redirect, useNavigate } from 'react-router-dom'
import customFetch from '../utils/custumFetch'
import { toast } from 'react-toastify'
import { useContext, createContext, useState } from 'react'
import SearchContainer from '../components/SearchContainer'
import JobsContainer from '../components/JobsContainer'
const AllJobsContext = createContext()

export const loader = async ({ request }) => {
  console.log(request.url)

  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])
    // console.log(params)

    const { data } = await customFetch.get('/jobs', {
      params,
    })

    // console.log(data)

    return {
      data,
      searchValues: { ...params },
    }
  } catch (error) {
    toast.error(error.response.jobs.msg)
    return error
  }
}

export default function AllJobs() {
  // const jobs = useLoaderData().data.jobs
  // console.log(useLoaderData())

  const { data, searchValues } = useLoaderData()
  // console.log(useLoaderData())

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)
