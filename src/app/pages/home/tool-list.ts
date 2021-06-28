import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface Tool {
    title:string,
    subtitle:string,
    description:string,
    uri:string,
    type:string,
    icon:IconProp,
    active:boolean
}

export const Tools:Tool[] = [
    {
        title:'Import Tester',
        subtitle:'CSV Tool',
        type:'v1',
        description:'Test your Volusion import file against common issues and formatting errors to ensure that your import completes successfully the first time.',
        uri:'/v1/import-tester',
        icon:['fas','file-csv'],
        active:true
    },
    {
        title:'CSV Splitter',
        subtitle:'CSV Tool',
        type:'utility',
        description:'Prevent import time outs by splitting large CSV import files into mutliple smaller files for a more streamlined Volusion store import process.',
        uri:'/utility/csv-splitter',
        icon:['fas','divide'],
        active:true
    },
    {
        title:'Field Mapper',
        subtitle:'import Tool',
        type:'v1',
        description:'Speed up importing third party product data by visually mapping fields and then export a working Volusion import CSV.',
        uri:'/v1/field-mapper',
        icon:['fas','exchange-alt'],
        active:true
    },
    {
        title:'Query Creator',
        subtitle:'Database Tool',
        type:'v1',
        description:'Create custom database queries for Saved Exports without the need for SQL knowledge, just select the fields and set your options.',
        uri:'/v1/query-creator',
        icon:['fas','database'],
        active:false
    },
    {
        title:'JSON+LD Generator',
        subtitle:'SEO Tool',
        type:'v1',
        description:'Generate Google Structured Data for your stores products to create an import CSV file to easily add the data to your store.',
        uri:'/v1/schema-generator',
        icon:['fas','code'],
        active:true
    },
    {
        title:'Product Catalog Generator',
        subtitle:'API Tool',
        type:'volt',
        description:'Create a Facebook product catalog file by connecting to your store through the Volt API to pull and then convert your stores product data.',
        uri:'/volt/facebook-catalog-creator',
        icon:['fab','facebook-f'],
        active:false
    },
    {
        title:'Product Catalog Generator',
        subtitle:'CSV Tool',
        type:'v1',
        description:'Create a Facebook product catalog file by uploading your product data CSV to have the data converted for use in Facebook.',
        uri:'/v1/facebook-catalog-creator',
        icon:['fab','facebook-f'],
        active:true
    },
    {
        title:'Character Counter',
        subtitle:'General Utility',
        type:'utility',
        description:'Find the exact character and word count of text. This can be used to eliminate issues with import content exceeding the maximum character for fields.',
        uri:'/utility/character-counter',
        icon:['fas','calculator'],
        active:true
    },
    {
        title:'Minifier',
        subtitle:'General Utility',
        type:'utility',
        description:'Minify HTML, CSS or Javascript to reduce file sizes on your store to increase your page load times.',
        uri:'/utility/minifier',
        icon:['fas','compress'],
        active:true
    },
    {
        title:'DNS Propagation Check',
        subtitle:'General Utility',
        type:'utility',
        description:'Lookup your domains DNS across multiple nameservers located around the world to check if they have updated to your DNS changes.',
        uri:'/utility/propagation-checker',
        icon:['fas','network-wired'],
        active:false
    },
    {
        title:'Unclosed DIV Checker',
        subtitle:'General Utility',
        type:'utility',
        description:'When making edits to template files or articles, an unclosed HTML element can cause display issue. Easily test your stores HTML for any unclosed elements.',
        uri:'/utility/unclosed-div-checker',
        icon:['fab','html5'],
        active:false
    }
]