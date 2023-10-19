provider "google" {
  project = "k8s-assignment-402302"
  region  = "northamerica-northeast1"
}

resource "google_container_cluster" "cluster" {
  name     = "first-gke-cluster"
  location = "northamerica-northeast1-a"

  initial_node_count = 1

  node_config {
    machine_type = "e2-micro"
    disk_size_gb = 10
    disk_type    = "pd-standard"
  }
}
