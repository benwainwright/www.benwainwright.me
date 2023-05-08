from diagrams import Diagram, Cluster, Edge
from diagrams.aws.network import Route53, CloudFront
from diagrams.aws.storage import S3
from diagrams.programming.framework import React
from diagrams.aws.network import APIGateway
from diagrams.aws.compute import Lambda 
from diagrams.aws.database import Dynamodb
from diagrams.onprem.vcs import Github




with Diagram(show=False):
    frontend = React("Client") >> Route53("DNS")
    static_bucket = S3("Static Assets")
    frontend >> Edge(minlen="0") >> CloudFront("CDN") >> Edge(minlen="0") >> static_bucket
    github = Github("Trigger Rebuild")
    backend = frontend >> APIGateway("API")
    backend  >> Lambda("Posts CRUD") >> Dynamodb("Posts") >> github >> static_bucket
    backend  >> Lambda("Comments CRUD") >> Dynamodb("Comments") >> github
    




    
