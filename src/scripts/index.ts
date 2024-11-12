const tree: HTMLDivElement = document.getElementById("root") as HTMLDivElement;

// The async IIFE is necessary because Chrome <89 does not support top level await.
(async function initPopupWindow() {
    // let bookmarks =
    chrome.bookmarks.getTree((results: chrome.bookmarks.BookmarkTreeNode[]) => {
        const bookmarks = results[0];

        console.log(bookmarks)

        let branch = createUL();
        branch.append(createLI(bookmarks))

        tree.append(branch);
    })

    function createLI(node: chrome.bookmarks.BookmarkTreeNode): HTMLLIElement {
        const leaf = document.createElement('li');

        if (node.url) {
            const link = document.createElement('a');
            link.href = node.url;
            link.target = '_blank';
            link.innerText = node.title;

            leaf.append(link);
        }
        else {
            leaf.innerText = node.title || 'no title';
        }

        if (node.children) {
            const branch = createUL();
            node.children.map(child => {
                branch.append(createLI(child));
            })
            leaf.append(branch);
        }

        return leaf;
    }

    function createUL(): HTMLUListElement {
        const root = document.createElement('ul');

        return root;
    }
    // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // if (tab?.url) {
    //     try {
    //         let url = new URL(tab.url);
    //         input.value = url.hostname;
    //     } catch { }
    // }

    // input.focus();
})();

// form.addEventListener("submit", handleFormSubmit);

// async function handleFormSubmit(event: Event) {
//     event.preventDefault();

//     clearMessage();

//     let url = stringToUrl(input.value);
//     if (!url) {
//         setMessage("Invalid URL");
//         return;
//     }

//     let message = await deleteDomainCookies(url.hostname);
//     setMessage(message);
// }

// function stringToUrl(input: string) {
//     // Start with treating the provided value as a URL
//     try {
//         return new URL(input);
//     } catch { }
//     // If that fails, try assuming the provided input is an HTTP host
//     try {
//         return new URL("http://" + input);
//     } catch { }
//     // If that fails ¯\_(ツ)_/¯
//     return null;
// }

// async function deleteDomainCookies(domain: string): Promise<string> {
//     let cookiesDeleted = 0;

//     try {
//         chrome.cookies.getAll({ domain }, async (cookies: chrome.cookies.Cookie[]) => {

//             if (cookies.length === 0) {
//                 return "No cookies found";
//             }

//             let pending = cookies.map(deleteCookie);
//             await Promise.all(pending);

//             cookiesDeleted = pending.length;
//         });
//     } catch (error) {
//         return `Unexpected error: ${error.message}`;
//     }

//     return `Deleted ${cookiesDeleted} cookie(s).`;
// }

// function deleteCookie(cookie: chrome.cookies.Cookie) {
//     // Cookie deletion is largely modeled off of how deleting cookies works when using HTTP headers.
//     // Specific flags on the cookie object like `secure` or `hostOnly` are not exposed for deletion
//     // purposes. Instead, cookies are deleted by URL, name, and storeId. Unlike HTTP headers, though,
//     // we don't have to delete cookies by setting Max-Age=0; we have a method for that ;)
//     //
//     // To remove cookies set with a Secure attribute, we must provide the correct protocol in the
//     // details object's `url` property.
//     // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#Secure
//     const protocol = cookie.secure ? "https:" : "http:";

//     // Note that the final URL may not be valid. The domain value for a standard cookie is prefixed
//     // with a period (invalid) while cookies that are set to `cookie.hostOnly == true` do not have
//     // this prefix (valid).
//     // https://developer.chrome.com/docs/extensions/reference/cookies/#type-Cookie
//     const cookieUrl = `${protocol}//${cookie.domain}${cookie.path}`;

//     return chrome.cookies.remove({
//         url: cookieUrl,
//         name: cookie.name,
//         storeId: cookie.storeId,
//     });
// }

// function setMessage(msg: string) {
//     message.textContent = msg;
//     message.hidden = false;
// }

// function clearMessage() {
//     message.hidden = true;
//     message.textContent = "";
// }