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
    <script src="../node_modules/jquery/dist/jquery.js"></script>

    <script src="../js/dimensions.js"></script>
    <script src="../js/options_file.js"></script>
    <script src="../js/readDocuments.js"></script>
    <script src="../js/events_pages_home.js"></script>
    <script src="../js/load_pages_home.js"></script>
    <script src="../js/add_select_files.js"></script>
    <script src="../js/favourites_load_db.js"></script>
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
              <a href="#" id="calendar"><i class="fas fa-calendar-alt"></i></a>
            </li>
            <li>
              <div id="notification_favourites"></div>
              <a href="#" id="fav"><i class="fas fa-star"></i></a>
            </li>
            <li>
              <div id="notification_task"></div>
              <a href="#" id="task"><i class="fas fa-tasks"></i></a>
            </li>
          </ul>
        </nav>
        <div id="container_logout_profile">
          <div class="user_log_out">
            <i class="fas fa-sign-out-alt"></i>
          </div>
          <div class="user_profile">
            <img src="https://avatars.dicebear.com/api/initials/:seed.svg" alt="No User">
          </div>
        </div>
      </header>
      <main>
        <div id="container_menu">
          <ul>
            <li><a id="documents_menu" href="#">All files</a></li>
            <li><a href="#">Recent</a></li>
            <li><a id="favourites_menu" href="#">Favorites</a></li>
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
                    <i id="back_dir" class="fas fa-arrow-left"> Back</i>
                  </li>
                  <li>
                    <input
                      type="file"
                      name="add_file"
                      id="add_file"
                      multiple
                      hidden
                    />
                    <label for="add_file"
                      ><i id="add_file" class="fas fa-file"> Add File</i
                    ></label>
                  </li>
                  <li>
                    <i id="add_folder" class="fas fa-folder"> Add Folder</i>
                  </li>
                  <li>
                    <i id="select_files" class="fas fa-check-square"> Select Files</i>
                  </li>
                  <li>
                    <i id="download_files_selected" class="fas fa-download"> Download</i>
                  </li>
                </ul>
              </div>
              <table class="table_files"><thead><tr><th>Name</th><th>File Size</th><th>Date</th></tr></thead></table>
            </div>
          </div>
        </div>
        <div id="container_calendar">
          <div><iframe id="calendar" src="./calendar.php" frameborder="0"></iframe></div>
        </div>
        <div id="container_favourites">
          <div><iframe id="favourites" src="./favourites.html" frameborder="0"></iframe></div>
        </div>
        <div id="container_tasks">
          <div><iframe id="tasks" src="./tasks.html" frameborder="0"></iframe></div>
        </div>
      </main>
    </div>
  </body>
</html>
