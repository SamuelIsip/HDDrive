<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HDDrive</title>
    <link rel="stylesheet" href="../css/styles-home.css" />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.0.7/css/all.css"
    />
    <script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous"
    ></script>

    <script src="../js/dimensions.js"></script>
    <script src="../js/options_file.js"></script>
    <script src="../js/readDocuments.js"></script>
    <script src="../js/events_pages_home.js"></script>
    <script src="../js/load_pages_home.js"></script>
    <script src="../js/add_select_files.js"></script>
    <script src="../js/task_load_db.js"></script>
  </head>
  <body>
    <div id="container">
      <header>
        <nav>
          <ul>
            <li>
              <a href="#" id="documents"><i class="fas fa-folder"></i></a>
            </li>
            <li>
              <a href="#" id="images"><i class="fas fa-images"></i></a>
            </li>
            <li>
              <a href="#" id="calendar"><i class="fas fa-calendar-alt"></i></a>
            </li>
            <li>
              <a href="#" id="bookmark"><i class="fas fa-bookmark"></i></a>
            </li>
            <li>
              <a href="#" id="task"><i class="fas fa-tasks"></i></a>
            </li>
          </ul>
        </nav>
        <div>
          <div class="user_profile"></div>
        </div>
      </header>
      <main>
        <div id="container_menu">
          <ul>
            <li><a href="#">All files</a></li>
            <li><a href="#">Recent</a></li>
            <li><a href="#">Favorites</a></li>
            <li><div>16 MP of 3GB used</div></li>
          </ul>
        </div>
        <div id="container_docs">
          <div class="docs_header">
            <ul>
              <li>
                <a href="#"><i class="fas fa-home"></i></a>
              </li>
              <li>
                <a href="#">Documents</a>
              </li>
            </ul>
          </div>
          <div class="docs_main">
            <div class="files">
              <div class="files__add__select">
                <ul>
                  <li>
                    <input
                      type="file"
                      name="add_file"
                      id="add_file"
                      multiple
                      hidden
                    />
                    <label for="add_file"
                      ><i id="add_file" class="fas fa-plus"></i
                    ></label>
                  </li>
                  <li>
                    <i id="select_files" class="fas fa-check-square"></i>
                  </li>
                  <li>
                    <i id="download_files_selected" class="fas fa-download"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="container_images">
          <div><p>IMAGES</p></div>
        </div>
        <div id="container_calendar">
          <div><iframe id="calendar" src="./calendar.php" frameborder="0"></iframe></div>
        </div>
        <div id="container_bookmarks">
          <div><p>BOOKMARKS</p></div>
        </div>
        <div id="container_tasks">
          <div><iframe id="tasks" src="./tasks.html" frameborder="0"></iframe></div>
        </div>
      </main>
    </div>
  </body>
</html>
