import React from 'react'

import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { MdAdminPanelSettings } from 'react-icons/md'

export const links = [
  { text: 'add job', path: '.', icon: <FaWpforms /> },
  // this is just another way of doing it as add job, is the main index routerfor dashboard
  // { text: 'add job', path: '/dashboard', icon: <FaWpforms /> },
  { text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
  { text: 'stats', path: 'stats', icon: <IoBarChartSharp /> },
  { text: 'profile', path: 'profile', icon: <ImProfile /> },
  { text: 'admin', path: 'admin', icon: <MdAdminPanelSettings /> },
]
