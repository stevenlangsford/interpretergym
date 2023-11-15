library(tidyverse)
library(jiebaR) #Chinese word segmentation

##rules to be a legal target csv:
##Chinese in col one, english in col two. No headers, just content.
##Cols are same length and contents match, ie are at least semi-decent translations of each other.

##Create a folder for each theme. The name *is* the theme tag.

my_themes <- c("medical","legal")

for(mytheme in my_themes){
    setwd(mytheme) #ugh? remember to undo
    targfiles  <- list.files(pattern = paste0("*.csv$"))

    for(afile in targfiles) {
        filename <- strsplit(afile,"\\.")[[1]][1]
        
        bitext <- read.csv(afile)
        engine1  <-  worker()

        aline <- bitext[1,1]
        segment(aline, engine1)

        sentence_tojs <- function(aline){
            depunct <- strsplit(aline, "[\"-.,?!()，。、？！（）:;'：；‘“——]+")[[1]]
            punct <- strsplit(aline, "\\w")
            punct <- punct[[1]][map_lgl(punct[[1]],
                                        function(i){!(i %in% c(""," "))})]

            if(length(depunct)!=length(punct))browser()

            repunct <- list()
            for(i in 1:length(depunct)){
                my_words <- segment(depunct[i],engine1)
                my_words[length(my_words)] <- paste0(my_words[length(my_words)],punct[i])
                repunct <- append(repunct,my_words)
            }
            repunct <- unlist(repunct)#list then unlist? Ugh.

            js_format <- paste0("[\"",paste(repunct,collapse="\",\""),"\"]")
            return(js_format)
        }

        story_tojs <- function(multi_sentence, langname){
            paste0(langname,":[",
                   paste0(map_chr(multi_sentence,sentence_tojs),collapse=","),"]"
                   )
        }

        df_tojs <- function(bitext,themename){
            paste0("{",
                   story_tojs(bitext[,1],"zh"),",",
                   story_tojs(bitext[,2],"eng"),",",
                   "theme:\"",themename,"\"",
                   "}"
                   )
        }
        ##word segmentation removes punctuation.
        ##So currently there's a hack to scrape and restore it
        ##The hack breaks ' words like I'm and don't into two
        ##This gsub sticks them back together.
        ##Ugly but least-annoying fix?
        mytext <- df_tojs(bitext,mytheme)
        mytext <-  gsub("'\",\"","'",mytext)
        fileConn<-file(paste0("../output/",filename,".js"))
        writeLines(mytext, fileConn)
        close(fileConn)
    }#end for afile in targfiles

    setwd("..")
}#end for each theme

##take everything in output and glom it into a giant js arr, because why not
setwd("output")

megaout <- file("../megaoutput.js","a")

##assumes there's more than one text.
##splits last from rest just so you don't add a trailing comma
##There's probably a better way
candidates <- list.files(pattern = "*.js")
last_one <- candidates[length(candidates)]
candidates <- candidates[1:(length(candidates)-1)]

##head line:
writeLines("const bi_text_pairs = [",megaout)

for(myobj in candidates){
    writeLines(readLines(myobj), megaout)
    writeLines(",\n", megaout)#there's that trailing comma
}
writeLines(readLines(last_one), megaout) #no trailing comma
writeLines("\n]",megaout)#close bi_text_pairs
close(megaout)
setwd("..") #this is definitely an antipattern.

###############notes###########
                                        #minimal jiebaR example:
                                        #hello <- bitext[1,1]
                                        #engine1 = worker()
                                        #segment(hello, engine1)
