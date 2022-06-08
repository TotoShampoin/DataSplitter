# DataSplitter

This application allows you to take in a json that consists in an array of objects, and use one of the attributes as a key to split the array into multiple json files. Nested objects is also supported.

[You can test it here](https://totoshampoin.github.io/DataSplitter/)

## How to use

- Import the json you want to split
- Set up the parameters
  - Select the attribute that will be used for the split in `Key split factor`
  - If another attribute is tied to the "split factor" and corresponds to some kind of name, you can select it in `Key name`
  - You can put additional in the future table of content in `Meta data`
    - Though, this field MUST be in the form of a strigified JSON
- You can download said parameters as a json, to avoid doing it all over again
- Hit the run button and observe as the computer generates the data
- Once all is generated, you can press the download button next to the run button, and you will get a zip file containing all the split data, as well as a table of content
