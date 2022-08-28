import Home from '../views/Home.vue'
import BookingEvent from '../views/BookingEvent.vue'
import SchedEvents from '../views/ScheduledEvents.vue'
import EventDetail from '../views/EventDetail.vue'
import EditEvent from '../views/EditEvent.vue'
import EditCategory from '../views/EditCategory.vue'
import ClinicCategory from '../views/ClinicCategory.vue'
import User from '../views/User.vue'
import AddUser from '../views/AddUser.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const history = createWebHashHistory(import.meta.env.VITE_APP_TITLE)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/booking-event',
    name: 'booking-event',
    component: BookingEvent,
  },
  {
    path: '/sch-events',
    name: 'sch-events',
    component: SchedEvents,
  },
  {
    path: '/event-detail',
    name: 'event-detail',
    component: EventDetail,
  },
  {
    path: '/edit-event',
    name: 'edit-event',
    component: EditEvent,
  },
  {
    path: '/clinic-cat',
    name: 'clinic-cat',
    component: ClinicCategory,
  },
  {
    path: '/edit-cat',
    name: 'edit-cat',
    component: EditCategory,
  },
  {
    path: '/all-user',
    name: 'all-user',
    component: User,
  },
  {
    path: '/add-user',
    name: 'add-user',
    component: AddUser,
  }

  
]

const router = createRouter({ history, routes })

export default router