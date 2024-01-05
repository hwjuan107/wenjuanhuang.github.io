$(document).ready(function () {
 
  $('ul.navbar-nav > li')
          .click(function (e) {
      $('ul.navbar-nav > li')
          .removeClass('active');
      $(this).addClass('active');
  });
});



const dataSet = [
  ['leetcode-15. 3Sum', 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.', 'Dec. 02, 2023', 'leetcode', 'sum-3.html'],
  ['leetcode-1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree', 'Find all the critical and pseudo-critical edges in the given graph\'s minimum spanning tree (MST). ', 'Nov. 03, 2023', 'leetcode', 'critical-mst.html'],
  ['leetcode-1235. Maximum Profit in Job Scheduling', 'We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i].', 'Oct. 18, 2023', 'leetcode', 'max-profit.html'],
  ['leetcode-75. Sort Colors', 'Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent,', 'Sep. 22, 2023', 'leetcode', 'sort-colors.html'],
  ['Vision Transformer Model', 'Trained and evaluated the Vision Transformer on the Horses vs. Camels dataset.', 'Apr. 21, 2023', 'CV', 'vit.html'],
  ['YOLOv3 model', 'To perform object detection with YOLOv3 in Keras, the first step is to download the pre-trained model weights.', 'Apr. 11, 2023', 'CV', 'yolov3.html'],
  ['Convolutional Autoencoders', 'Used Convolutional Autoencoders to detect anomalies in images of Flowers Recognitionn dataset.', 'Apr. 04, 2023', 'CV', 'con-autoencoder.html'],
  ['ResNet50 CNN model', 'Used transfer learning on a pre-trained ResNet50 CNN model trained on the ImageNet dataset to perform classification for recognizing images of horses and camels', 'Mar. 01, 2023', 'CV', 'resnet.html'],
  ['Used Keras to visualize inputs of VGG16', 'Used Keras to visualize inputs that maximize the activation of the filters in different layers of the VGG16 architecture, trained on ImageNet.', 'Feb.17, 2023', 'CV', 'vgg-imgnet.html'],
  ['Created a simple CNN from scratch using PyTorch', 'Download MNIST dataset in local system. Create a base CNN model (Conv → MaxPooling → Conv → MaxPooling → FC).', 'Feb. 11, 2023', 'CV', 'pytorch-cnn.html'],
  ['Detected handwritten digits with CNNs', 'Created a simple CNN from scratch using the deep learning framework of Keras to perform classification on the MNIST dataset.','Feb. 03, 2023', 'CV', 'cnn-mnist.html'],
  ['Processing images', 'Processing images through OpenCV and plots results in a Jupyter Notebook using the Matplotlib library.', 'Jan. 25, 2023', 'DIP', 'process-image.html'],
];

var pager = {};
pager.items = dataSet;
pager.itemsPerPage = 5;
pagerInit(pager);

function bindList() {
    var pgItems = pager.pagedItems[pager.currentPage];
    $("#myList").empty();
    for (var i = 0; i < pgItems.length; i++) {
        var listItem = $('<li class="list-group-item border-top-0 border-end-0 border-start-0">');
        // Create the inner content using a template literal
        let category = ''
        if(pgItems[i][3] === 'DIP'){
          category = '<i class="fa-solid fa-image"></i> DIP';
        } else if(pgItems[i][3] === 'CV'){
          category = '<i class="fa-solid fa-font-awesome"></i> CV';
        } else if(pgItems[i][3] === 'leetcode'){
          category = '<i class="fa-solid fa-hashtag"></i> leetcode';
        }
        // Create an anchor element with the link
        var anchor = $('<a href="' + pgItems[i][4] + '">');
        // Set CSS properties to remove underline
        anchor.css({
          'text-decoration': 'none',
          'border': 'none',
          'outline': 'none',
          'color': 'black'
        });
        anchor.html(`
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${pgItems[i][0]}</h5>
            </div>
            <small>${pgItems[i][1]}</small>
            <p>${pgItems[i][2]} &nbsp; &nbsp; &nbsp; ${category}</p>
        `);

        anchor.on('click', function() {
          // Save the clicked record to localStorage
          localStorage.setItem('clickedRecord', JSON.stringify(pgItems[i][0]));
        });

        listItem.append(anchor);
        $("#myList").append(listItem);
    }
    // Update the page label
    $("#pageLabel").text(`${pager.currentPage + 1} / ${pager.pagedItems.length}`);
}

function prevPage() {
    pager.prevPage();
    bindList();
}

function nextPage() {
    pager.nextPage();
    bindList();
}

function pagerInit(p) {
    p.pagedItems = [];
    p.currentPage = 0;
    if (p.itemsPerPage === undefined) {
        p.itemsPerPage = 5;
    }
    p.prevPage = function () {
        if (p.currentPage > 0) {
            p.currentPage--;
        }
    };
    p.nextPage = function () {
        if (p.currentPage < p.pagedItems.length - 1) {
            p.currentPage++;
        }
    };
    init = function () {
        for (var i = 0; i < p.items.length; i++) {
            if (i % p.itemsPerPage === 0) {
                p.pagedItems[Math.floor(i / p.itemsPerPage)] = [p.items[i]];
            } else {
                p.pagedItems[Math.floor(i / p.itemsPerPage)].push(p.items[i]);
            }
        }
    };
    init();
}

$(function () {
    bindList();

    $("#searchInput").on("keypress", function (event) {
      // Check if the key pressed is the "Enter" key (key code 13)
      if (event.which === 13) {
          var value = $(this).val().toLowerCase();
          pager.items = dataSet.filter(item =>
              item.some(field => field.toLowerCase().includes(value))
          );
          pagerInit(pager);
          bindList();
      }
    });
});

function renderRecentList() {
  // Clear the recent list
  $('#recentList').empty();

  // Get the latest 5 entries (or less if there are fewer than 5)
  const latestEntries = dataSet.slice(0, Math.min(5, dataSet.length));

  // Loop through the latest entries and add each item to the list
  latestEntries.forEach(item => {
      $('#recentList').append(`<li class="list-group-item ">${item[0]}</li>`);
  });
}

renderRecentList();


//categories list

var categoryPage = {};
categoryPage.items = dataSet;
bindCategoryList();

function bindCategoryList() {
  var pgItems = categoryPage.items;
  $("#categoryList").empty();

  // Create an object to store items grouped by category
  var groupedItems = {};

  // Group items by category
  pgItems.forEach(function (item) {
      var category = item[3];
      if (!groupedItems[category]) {
          groupedItems[category] = [];
      }
      groupedItems[category].push(item);
  });

  // Iterate over grouped items and create sections for each category
  for (var category in groupedItems) {
      if (groupedItems.hasOwnProperty(category)) {
          // Create a section for the category
          var categorySection = $('<div class="category-section">');
          categorySection.append('<h3>' + getCategoryIcon(category) + ' ' + category + '</h3>');

          // Create list items for items within the category
          groupedItems[category].forEach(function (item,index) {
              var listItem = $('<li class="list-group-item list-group-flush justify-content-between align-items-center border-top-0 border-end-0 border-start-0">');
              var anchor = $('<a href="' + item[4] + '">');
              anchor.css({
                  'text-decoration': 'none',
                  'border': 'none',
                  'outline': 'none',
                  'color': 'black'
              });
              anchor.html(`
                  <p class="fs-6 lh-1">${item[0]}</p>
              `);

              if (index < groupedItems[category].length - 1) {
                listItem.css('margin-bottom', '2px'); // Adjust the margin value as needed
            }

              listItem.append(anchor);
              categorySection.append(listItem);
          });

          // Append the category section to the main list
          $("#categoryList").append(categorySection);
      }
  }
}

// Function to get category icon
function getCategoryIcon(category) {
  if (category === 'DIP') {
      return '<i class="fa-solid fa-image"></i>';
  } else if (category === 'CV') {
      return '<i class="fa-solid fa-font-awesome"></i>';
  } else if(category === 'leetcode'){
    return '<i class="fa-solid fa-hashtag"></i>';
  }
  return ''; // Add more categories as needed
}


var snippets = document.getElementsByTagName('pre');
var numberOfSnippets = snippets.length;
for (var i = 0; i < numberOfSnippets; i++) {
    code = snippets[i].getElementsByTagName('code')[0].innerText;

    snippets[i].classList.add('hljs'); // append copy button to pre tag

    snippets[i].innerHTML = '<button class="hljs-copy">Copy</button>' + snippets[i].innerHTML; // append copy button

    snippets[i].getElementsByClassName('hljs-copy')[0].addEventListener("click", function () {
        this.innerText = 'Copying..';
        /*if (!navigator.userAgent.toLowerCase().includes('safari')) {
            navigator.clipboard.writeText(code);
        } 
        else {
            prompt("Clipboard (Select: ctrl+a > Copy:ctrl+c)", code);
        }*/
        navigator.clipboard.writeText(code);
        this.innerText = 'Copied!';
        button = this;
        setTimeout(function () {
            button.innerText = 'Copy';
        }, 1000)
    });
}




/*
  // Create a new list group item
  for (i=0; i<dataSet.length; i++) {
    const listItem = document.createElement('a');
    listItem.href = dataSet[i][4];
    listItem.classList.add('list-group-item');
    listItem.classList.add('border-top-0');
    listItem.classList.add('border-end-0');
    listItem.classList.add('border-start-0');
    // Create the inner content using a template literal
    let category = ''
    if(dataSet[i][3] === 'DIP'){
      category = '<i class="fa-solid fa-code-merge"></i> DIP';
    } else if(dataSet[i][3] === 'CV'){
      category = '<i class="fa-solid fa-font-awesome"></i> CV';
    }

    listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${dataSet[i][0]}</h5>      
        </div>
        <h7>${dataSet[i][1]}</h7>
        <p class="fs-6">${dataSet[i][2]} &nbsp;  &nbsp; &nbsp; ${category}</p>
       
    `;
    
    // Append the list item to the list container
    document.getElementById('listContainer').appendChild(listItem);
  }
  
  */