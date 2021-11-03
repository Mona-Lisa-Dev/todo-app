# Website for creating todos (tasks) with authorization.

- Implemented all requests for CRUD technology.
- The authorized user has the ability to create, edit, mark tasks when they are
  completed, and also delete them.
- There is a search for tasks by date of their creation (also near the search by
  date there is a button to return to all tasks for all dates), as well there is
  a search by name (also near the search there is a search clear button).
- The user can sort the tasks by status - completed or not, or select all tasks.
- There is a sort in alphabetical order, in reverse order and by default.
- Pagination occurs when there are more than 4 tasks.

---

Used libraries and technologies: React | React Hooks | React Hook Form | React
Router | Code Splitting | Redux | Redux persist | Redux Toolkit | SCSS modules |
Axios | MUI | Debounce | Chart.js | React Avatar Editor | React Flags Select |
React Intl | React slick | Storybook React

---

1. Clone the repository -
   `git clone https://github.com/OlenaTsemko/some-new-repo.git`
2. Open the repository directory and execute the command - `npm i` to set all
   dependencies
3. To open a page on localhost:3000 enter the command - `npm start`

The [backend](https://github.com/OlenaTsemko/todo-rest-api) repository used

---

## Task list:

- create a project using create-react-app
- installation of prettier, ESLint and other libraries for code formatting,
  configuration files, modern-normalize, node-sass, configuration of absolute
  import
- creation of components of registration forms and login using react-hook-form
  and their validation
- deployment of redux, use of redux / toolkit, axios library for backend
  requests, error handling with axios.interceptors
- user authorization
- loader

---

for an authorized user:

1. Todos Page:

- creating, editing, deleting todos (delete confirmation)
- queries for todos on pages, pagination
- selects for sorting todos:
  1.  all, fulfilled, unfulfilled.
  2.  alphabetically, in reverse order, by default
- filter to search for todos by name (using lodash.debounce) and by creation
  date
- graphs with display of completed/not completed todos (chart.js)
- scroll button at the top of the page

2. Slider Page

- use of react-slick lib
- When you hover over the slide, the video starts

- light / dark themes
- internationalization (8 languages) stored in the local storage, when the page
  is reloaded, everything remains unchanged

- routing on all pages (as well as routing to filters and sorting)
- creating roles (admin and user), different templates for them

---

for admin:

- in addition to the user panel (with todos and sliders) there is a switch to
  the admin panel
- page with all users, information about them, the ability to edit and delete,
  the ability to edit the status completed to true for registered users so that
  they can log in after moderation by the administrator
- page with all the todos, editable/deleted

- when deleting a user, all of his todos are deleted
- when the user logs out, the entire state of the redux is cleared

- creation of a user profile page, the ability to edit the name, update the
  avatar with the ability to crop (using react-avatar-editor lib)
- storybook for UI components
