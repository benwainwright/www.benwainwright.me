from diagrams import Diagram, Cluster, Edge
from diagrams.aws.network import Route53, CloudFront
from diagrams.aws.storage import S3
from diagrams.programming.framework import React
from diagrams.aws.network import APIGateway
from diagrams.aws.compute import Lambda 
from diagrams.aws.database import Dynamodb
from diagrams.onprem.ci import GithubActions



with Diagram(show=False):
    frontend = React("Client") >> Route53("DNS")
    static_bucket = S3("Static Assets")
    frontend >> CloudFront("CDN") - Edge(minlen="0") - static_bucket
    frontend >> APIGateway("API") >> Lambda("Posts CRUD") >> Dynamodb("Posts") >> GithubActions("Trigger Rebuild") >> static_bucket
    




    
