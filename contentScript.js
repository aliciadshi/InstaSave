var postClass = '[class="x1ypdohk x78zum5 xdt5ytf x5yr21d xa1mljc xh8yej3 x1bs97v6 x1q0q8m5 xso031l x11aubdm xnc8uc2"]';
var singularPostClass = '[class="_aatb _aate _aatg _aati"]'
var imageClass = '[class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3"]';
var actionBarClass = '[class="x6s0dn4 xrvj5dj x1o61qjw x12nagc x1gslohp"]';
var bookmarkClass = '[class="x11i5rnm x1gryazu"]'
var posts = [];
var singlePost;

if(typeof init === 'undefined') {
    const init = function() {
        console.log("Insta extension activated")

        const targetNode = document.body;
        const config = { attributes: false, childList: true, subtree: false };

        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type == "childList") {
                    const foundPosts = document.querySelectorAll('[class="x1ypdohk x78zum5 xdt5ytf x5yr21d xa1mljc xh8yej3 x1bs97v6 x1q0q8m5 xso031l x11aubdm xnc8uc2"]');
                    const singularPost = document.querySelector("._a9z6");
                    if (singularPost != null) {
                        console.log("singular post not null");
                        singlePost = document.querySelector('[class="_aatb _aate _aatg _aati"]');
                        console.log(singlePost);
                        if (singlePost.querySelector("video")) {
                            const actionBar = singlePost.querySelector('[class="x6s0dn4 xrvj5dj x1o61qjw"]')
                            const bookmark = actionBar.querySelector('[class="x11i5rnm x1gryazu"]');
                            console.log("is video");
                            addCannotSaveP(singlePost, bookmark);
                        } else {
                            const bookmark = singlePost.querySelector("._aamz");
                            console.log("is not a video");
                            console.log(bookmark);

                            const button = document.createElement("button");
                            button.id = "self-added-extension-button";
                            button.textContent = "Download"

                            button.onclick = function() {clickHandler(bookmark, singlePost)};
                                
                            if (!singlePost.querySelector("#self-added-extension-button")) {
                                bookmark.appendChild(button);
                            }
                        }
                    } else if (foundPosts != null) {
                        posts = foundPosts;
                        for (const post of posts) {
                            const bookmark = post.querySelector(bookmarkClass);
                            
                            if (post.querySelector("video")) {
                                addCannotSaveP(post, bookmark);
                            } else {
                                const button = document.createElement("button");

                                button.id = "self-added-extension-button";
                                button.textContent = "Download"
                                button.onclick = function() {clickHandler(bookmark, post)};
                                
                                if (!post.querySelector("#self-added-extension-button")) {
                                    bookmark.appendChild(button);
                                }
                            }

                        }
                    }

                }
                
            }
        }

        const observer = new MutationObserver(callback);

        observer.observe(targetNode, config);
    }
    init();
}


function addCannotSaveP(post, bookmark) {
    const cannotSave = document.createElement("p");
    cannotSave.textContent = "Not an Image";
    cannotSave.id = "self-added-extension-p";
    if (!post.querySelector("#self-added-extension-p")) {
        bookmark.appendChild(cannotSave);
    }
}


function clickHandler(el, element) {
    const checkIfUL = element.querySelector("._acay");

    var img;

    if (checkIfUL != null) {
        console.log("There is UL");
        const liElements = checkIfUL.querySelectorAll("li");
        if (liElements.length == 3) {
            console.log("UL length is 3");
            const checkIfNext = element.querySelector('[aria-label="Next"]');
            if (checkIfNext == null) {
                console.log("There is NO Next");
                img = liElements[2].querySelector('[class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3"]');
            } else {
                console.log("There is Next");
                img = element.querySelector('[class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3"]');
            }
            console.log(img);
        } else {
            console.log("UL length is NOT 3");
            img = liElements[2].querySelector('[class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3"]');
            console.log(img);
        }
    } else {
        console.log("There is no UL");
        img = element.querySelector('[class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3"]');
        console.log(img);
    }

    chrome.runtime.sendMessage({message: img.src}, function (response) {
        console.log("Image downloaded");
    });
}