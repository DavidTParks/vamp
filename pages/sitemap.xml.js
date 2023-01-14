//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = "https://jsonplaceholder.typicode.com/posts"
import { db } from "@/lib/db"
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next"

function generateSiteMap(bounties, projects, users) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://vamp.sh</loc>
     </url>
     <url>
       <loc>https://vamp.sh/tos</loc>
     </url>
          <url>
    <loc>https://vamp.sh/privacy-policy</loc>
     </url>
     ${bounties
         .map(({ id }) => {
             return `
       <url>
           <loc>${`https://vamp.sh/bounty/${id}`}</loc>
       </url>
     `
         })
         .join("")}
           ${projects
               .map(({ id }) => {
                   return `
       <url>
           <loc>${`https://vamp.sh/p/${id}`}</loc>
       </url>
     `
               })
               .join("")}
                 ${users
                     .map(({ id }) => {
                         return `
       <url>
           <loc>${`https://vamp.sh/u/${id}`}</loc>
       </url>
     `
                     })
                     .join("")}
   </urlset>
 `
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export const getServerSideProps = async (context) => {
    const { res } = context

    const bounties = await db.bounty.findMany({
        where: {
            deleted: false,
        },
        select: {
            id: true,
        },
    })
    const projects = await db.project.findMany({
        where: {
            deleted: false,
        },
        select: {
            id: true,
        },
    })
    const users = await db.user.findMany({
        select: {
            id: true,
        },
    })

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(bounties, projects, users)

    res.setHeader("Content-Type", "text/xml")
    // we send the XML to the browser
    res.write(sitemap)
    res.end()

    return {
        props: {},
    }
}

export default SiteMap
